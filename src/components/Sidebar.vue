<template>
	<div
		class="bg-primary-purplish-blue bg-[url('/imgs/bg-sidebar-desktop.svg')] bg-cover bg-bottom bg-no-repeat w-full max-w-xs rounded-xl py-8 px-6 flex flex-col gap-2 text-white"
	>
		<button
			v-for="(step, index) in steps"
			@click.prevent="$emit('change-step', index)"
			class="flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300 text-left"
			:class="{ 'bg-white/10': index === activeStepIndex }"
		>
			<div
				class="w-10 h-10 flex justify-center items-center rounded-full border border-white font-medium transition-colors duration-300"
				:class="{ 'bg-primary-light-blue text-primary-marine-blue shadow': index === activeStepIndex }"
			>
				<span v-text="index + 1" />
			</div>

			<div>
				<p class="text-secondary-light-gray text-sm">SETP {{ index + 1 }}</p>
				<p v-text="step.label" class="font-medium tracking-wider" />
			</div>
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	steps: Array,
	activeStepIndex: Number,
});
</script>
