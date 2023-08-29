<template>
	<div class="min-h-screen bg-secondary-magnolia flex justify-center items-center p-4">
		<Container>
			<div class="bg-white rounded-2xl shadow-lg p-4 flex min-h-[650px]">
				<Sidebar
					:steps="steps"
					:activeStepIndex="store.activeStepIndex"
					@change-step="store.goToStep($event)"
				/>

				<Content v-if="!showThanks" :steps="steps" @submit="submit()" />
				<Thankyou v-else />
			</div>
		</Container>
	</div>
</template>

<script setup>
import Container from "@/components/Container.vue";
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";
import Form1 from "@/components/forms/Form1.vue";
import Form2 from "@/components/forms/Form2.vue";
import Form3 from "@/components/forms/Form3.vue";
import Form4 from "@/components/forms/Form4.vue";
import { ref } from "vue";
import { useFormStore } from "@/stores/form";
import Thankyou from "./components/Thankyou.vue";

const store = useFormStore();

const showThanks = ref(false);
const steps = ref([
	{
		label: "YOUR INFO",
		title: "Personal Info",
		description: "Please provide your name, email address, and phone number.",
		formComponent: Form1,
	},
	{
		label: "SELECT PLAN",
		title: "Select Your Plan",
		description: "You have the option of monthly or yearly billing.",
		formComponent: Form2,
	},
	{
		label: "ADD-ONS",
		title: "Pick add-ons",
		description: "Add-ons help enhance your gaming experience.",
		formComponent: Form3,
	},
	{
		label: "SUMMARY",
		title: "Finishing up",
		description: "Double-check everything looks OK before confirming.",
		formComponent: Form4,
	},
]);

function submit() {
	if (!store.validatePersonalInfo()) return;

	showThanks.value = true;
}
</script>
