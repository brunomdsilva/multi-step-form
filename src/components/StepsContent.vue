<template>
	<Thankyou v-if="isFormSubmitted" />

	<div v-else class="flex flex-col gap-10">
		<div class="flex flex-col gap-1">
			<h2 v-text="activeStep.title" class="text-primary-marine-blue text-3xl font-bold" />
			<p v-text="activeStep.description" class="text-secondary-cool-gray" />
		</div>

		<div class="flex-grow">
			<Transition
				enter-from-class="opacity-0"
				leave-to-class="opacity-0"
				enter-active-class="transition-opacity duration-300"
				leave-active-class="transition-opacity duration-300"
				mode="out-in"
			>
				<component :is="activeStep.formComponent" />
			</Transition>
		</div>
	</div>
</template>

<script setup>
import Thankyou from "@/components/Thankyou.vue";

const props = defineProps({
	activeStep: Object,
	isFormSubmitted: Boolean,
});
</script>
