<template>
	<label class="flex flex-col gap-1">
		<span v-text="label" class="text-primary-marine-blue text-sm" />

		<input
			@input="handleInput($event.target.value)"
			:type="type"
			:placeholder="placeholder"
			:value="modelValue"
			v-maska
			:data-maska="computedMask"
			class="px-4 py-3 text-sm rounded-lg border border-secondary-light-gray placeholder-secondary-cool-gray focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue text-primary-marine-blue"
		/>
	</label>
</template>

<script setup>
import { computed } from "vue";
import { vMaska } from "maska";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: String,
	label: String,
	placeholder: String,
	type: {
		type: String,
		default: "text",
	},
});

const computedMask = computed(() => {
	if (props.type === "tel") return "+# ### ### ####";

	return null;
});

function handleInput(value) {
	emit("update:modelValue", value);
}
</script>
