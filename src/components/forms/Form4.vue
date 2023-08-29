<template>
	<div class="flex flex-col gap-8">
		<div class="p-6 rounded-lg flex flex-col gap-6 bg-secondary-alabaster">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p
						class="text-lg text-primary-marine-blue font-medium"
						v-text="store.summary.plan.title + ` (${store.isYearlySub ? 'Yearly' : 'Monthly'})`"
					/>

					<button
						@click.prevent="store.goToStep(1)"
						class="underline underline-offset-2 text-secondary-cool-gray hover:text-primary-purplish-blue text-sm transition-colors duration-300"
					>
						Change plan
					</button>
				</div>

				<p
					class="text-primary-marine-blue font-bold text-lg"
					v-text="`$${store.summary.plan.price}/${store.isYearlySub ? 'yr' : 'mo'}`"
				/>
			</div>

			<hr v-show="store.summary.addons.length" class="border-secondary-light-gray" />

			<div v-show="store.summary.addons.length" class="flex flex-col gap-4">
				<div v-for="addon in store.summary.addons" class="flex items-center justify-between gap-4">
					<p v-text="addon.title" class="text-secondary-cool-gray" />
					<p
						v-text="`+$${addon.price}/${store.isYearlySub ? 'yr' : 'mo'}`"
						class="text-primary-marine-blue text-sm"
					/>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-between gap-4 px-4">
			<p class="text-secondary-cool-gray">Total (per {{ store.isYearlySub ? "year" : "month" }})</p>
			<p
				class="text-primary-purplish-blue font-bold text-xl"
				v-text="`$${store.summary.totalPrice}/${store.isYearlySub ? 'yr' : 'mo'}`"
			/>
		</div>
	</div>
</template>

<script setup>
import { useFormStore } from "@/stores/form";

const store = useFormStore();
</script>
