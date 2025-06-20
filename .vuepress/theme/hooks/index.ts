import {computed, onMounted, reactive, toRef} from "vue";
import {withBase, usePageData} from "@vuepress/client";
import {IPostItem} from "../../type";

let posts: IPostItem[];

export function usePosts() {
  const pageData = usePageData();
  const state = reactive({
    posts: [] as IPostItem[],
  })

  // SSG: pageData에서 posts 가져오기 (우선순위)
  const postsFromPageData = computed(() => {
    return (pageData.value as any)?.posts || [];
  });

  // SSR에서도 즉시 데이터 반영을 위한 computed
  const allPosts = computed(() => {
    return postsFromPageData.value.length > 0 ? postsFromPageData.value : state.posts;
  });

  onMounted(async () => {
    // pageData에 posts가 있으면 사용 (SSG)
    if (postsFromPageData.value.length > 0) {
      state.posts = postsFromPageData.value;
      posts = postsFromPageData.value;
    }
    // 없으면 기존 방식으로 fallback (CSR)
    else if (!posts) {
      posts = await fetch(withBase("/posts.json")).then(res => res.json());
      state.posts = posts;
    } else {
      state.posts = posts;
    }
  });

  return allPosts;
}
