import {onMounted, reactive, toRef} from "vue";
import {withBase} from "@vuepress/client";
import {IPostItem} from "../../type";

let posts: IPostItem[];

export function usePosts() {
  const state = reactive({
    posts: [],
  })

  onMounted(async () => {
    if (!posts) {
      posts = await fetch(withBase("/posts.json")).then(res => res.json());
    }

    state.posts = posts;
  });

  return toRef(state, 'posts');
}