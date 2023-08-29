<template>
	<div class="flex flex-col gap-4">
		<SmartInput
			type="text"
			label="Name"
			placeholder="e.g. Stephen King"
			v-model="form.name"
			:error="store.errors.name"
		/>
		<SmartInput
			type="email"
			label="Email Address"
			placeholder="e.g.stephenking@lorem.com"
			v-model="form.email"
			:error="store.errors.email"
		/>
		<SmartInput
			type="tel"
			label="Phone Number"
			placeholder="e.g. +1 234 567 890"
			v-model="form.phone"
			:error="store.errors.phone"
		/>
	</div>
</template>

<script setup>
import SmartInput from "@/components/SmartInput.vue";
import { useFormStore } from "@/stores/form";
import { ref, watch } from "vue";

const store = useFormStore();

const form = ref({
	name: store.name,
	email: store.email,
	phone: store.phone,
});

watch(form.value, (newVal) => {
	store.updatePersonalInfo(newVal);
});
</script>
