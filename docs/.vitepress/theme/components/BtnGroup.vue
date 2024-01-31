<script setup lang="ts">
interface Props {
  issue?: string;
  answer?: string;
  featured?: string;
}

defineOptions({ name: "BtnGroup" });

const props = defineProps<Props>();
</script>

<template>
  <div class="btn-group">
    <a
      v-if="props.answer"
      class="btn btn-issue"
      :href="props.issue"
      target="_blank"
    >
      <slot name="issue">查看解答</slot>
    </a>
    <a
      v-if="props.answer"
      class="btn btn-answer"
      :href="props.answer"
      target="_blank"
    >
      <slot name="answer">我的解答</slot>
    </a>
    <a
      v-if="props.featured"
      class="btn btn-featured"
      :href="props.featured"
      target="_blank"
    >
      <slot name="featured">查看精选</slot>
    </a>
  </div>
</template>

<style scoped>
.btn-group {
  margin: 16px 0;
}

.btn {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  padding: 2px 6px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  border-radius: 4px;
}

.btn:hover {
  color: #fff;
}

.btn-issue {
  background: #0f766e;
}

.btn-answer {
  background: #b91c1c;
}

.btn-featured {
  background: #334155;
}
</style>
