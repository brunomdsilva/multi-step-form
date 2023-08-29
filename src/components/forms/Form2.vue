<template>
	<div class="flex flex-col gap-8">
		<div class="grid grid-cols-3 gap-4">
			<button
				v-for="(plan, index) in plans"
				@click.prevent="activePlanIndex = index"
				class="border p-4 flex flex-col gap-12 rounded-xl text-left transition-colors duration-300"
				:class="
					activePlanIndex === index
						? 'border-primary-purplish-blue bg-secondary-alabaster'
						: 'border-secondary-light-gray'
				"
			>
				<img :src="plan.icon" alt="" class="w-12" />

				<div class="flex flex-col gap-1">
					<p v-text="plan.title" class="font-medium text-primary-marine-blue text-lg" />
					<p
						v-text="isYearly ? `$${plan.yearPrice}/yr` : `$${plan.monthPrice}/mo`"
						class="text-secondary-cool-gray"
					/>
					<p v-show="isYearly" class="text-sm text-primary-marine-blue">2 months free</p>
				</div>
			</button>
		</div>

		<button
			@click.prevent="isYearly = !isYearly"
			class="relative bg-secondary-alabaster border border-secondary-light-gray p-4 rounded-lg flex justify-center items-center gap-6 text-sm font-medium text-primary-marine-blue"
		>
			<p class="flex flex-grow justify-end basis-0">Monthly</p>
			<div class="p-1 w-10 h-6 flex rounded-full transition-colors duration-300 bg-primary-marine-blue">
				<div
					class="aspect-square rounded-full transition-[margin] duration-300 bg-white"
					:class="{ 'ml-4': isYearly }"
				/>
			</div>
			<p class="flex flex-grow basis-0">Yearly</p>
		</button>
	</div>
</template>

<script setup>
import { ref } from "vue";

const isYearly = ref(false);
const activePlanIndex = ref(0);
const plans = ref([
	{ title: "Arcade", monthPrice: 9, yearPrice: 90, icon: "imgs/icon-arcade.svg" },
	{ title: "Advanced", monthPrice: 12, yearPrice: 120, icon: "imgs/icon-advanced.svg" },
	{ title: "Pro", monthPrice: 15, yearPrice: 150, icon: "imgs/icon-pro.svg" },
]);
</script>
