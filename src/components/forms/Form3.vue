<template>
	<div class="flex flex-col gap-4">
		<button
			v-for="addon in store.addons"
			@click.prevent="store.updateActiveAddons(addon.id)"
			class="flex items-center gap-6 py-4 px-6 rounded-lg border text-left transition-colors duration-300 hover:border-primary-purplish-blue"
			:class="
				isActiveAddon(addon.id)
					? 'border-primary-purplish-blue bg-secondary-alabaster'
					: 'border-secondary-light-gray'
			"
		>
			<div
				class="p-1 rounded border transition-colors duration-300"
				:class="
					isActiveAddon(addon.id)
						? 'border-primary-purplish-blue bg-primary-purplish-blue'
						: 'border-secondary-light-gray'
				"
			>
				<IconCheck class="w-3.5 aspect-square fill-white" />
			</div>

			<div class="flex flex-col">
				<p class="text-primary-marine-blue font-medium text-lg" v-text="addon.title" />
				<p v-text="addon.description" class="text-secondary-cool-gray" />
			</div>

			<p
				class="ml-auto text-primary-purplish-blue text-sm"
				v-text="store.isYearlySub ? `+$${addon.yearPrice}/yr` : `+$${addon.monthPrice}/mo`"
			/>
		</button>
	</div>
</template>

<script setup>
import { useFormStore } from "@/stores/form";
import IconCheck from "@/components/icons/IconCheck.vue";

const store = useFormStore();

function isActiveAddon(id) {
	return store.activeAddonsIds.includes(id);
}
</script>
