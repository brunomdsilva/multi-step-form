import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
	state: () => ({
		name: "",
		email: "",
		phone: "",

		errors: {
			name: null,
			email: null,
			phone: null,
		},

		isYearlySub: false,

		activePlanIndex: 0,
		plans: [
			{ title: "Arcade", monthPrice: 9, yearPrice: 90, icon: "imgs/icon-arcade.svg" },
			{ title: "Advanced", monthPrice: 12, yearPrice: 120, icon: "imgs/icon-advanced.svg" },
			{ title: "Pro", monthPrice: 15, yearPrice: 150, icon: "imgs/icon-pro.svg" },
		],

		activeAddonsIds: [],
		addons: [
			{
				id: 1,
				title: "Online service",
				description: "Access to multiplayer games",
				monthPrice: 1,
				yearPrice: 10,
			},
			{ id: 2, title: "Larger storage", description: "Extra 1TB of cloud save", monthPrice: 2, yearPrice: 20 },
			{
				id: 3,
				title: "Customizable profile",
				description: "Custom theme on your profile",
				monthPrice: 2,
				yearPrice: 20,
			},
		],

		activeStepIndex: 0,
	}),

	getters: {
		summary() {
			const selectedPlan = this.plans[this.activePlanIndex];
			const mappedPlan = {
				title: selectedPlan.title,
				price: this.isYearlySub ? selectedPlan.yearPrice : selectedPlan.monthPrice,
			};

			const selectedAddons = this.addons.filter((addon) => this.activeAddonsIds.includes(addon.id));
			const mappedAddons = selectedAddons.map((addon) => {
				return {
					title: addon.title,
					price: this.isYearlySub ? addon.yearPrice : addon.monthPrice,
				};
			});

			const totalPrice = mappedPlan.price + mappedAddons.reduce((acc, addon) => acc + addon.price, 0);

			return {
				name: this.name,
				email: this.email,
				phone: this.phone,
				plan: mappedPlan,
				addons: mappedAddons,
				totalPrice,
			};
		},
	},

	actions: {
		updateActivePlan(index) {
			this.activePlanIndex = index;
		},

		updateActiveAddons(addonId) {
			this.activeAddonsIds.includes(addonId)
				? this.activeAddonsIds.splice(this.activeAddonsIds.indexOf(addonId), 1)
				: this.activeAddonsIds.push(addonId);
		},

		updatePersonalInfo(values) {
			Object.assign(this, values);
		},

		toggleYearlySub() {
			this.isYearlySub = !this.isYearlySub;
		},

		nextStep() {
			this.activeStepIndex++;
		},

		backStep() {
			this.activeStepIndex--;
		},

		goToStep(index) {
			this.activeStepIndex = index;
		},

		validatePersonalInfo() {
			const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			const fields = ["name", "email", "phone"];

			fields.forEach((field) => {
				!this[field] ? (this.errors[field] = "This field is required") : (this.errors[field] = null);
			});
			if (this.email && !emailRegex.test(this.email)) this.errors.email = "Invalid email";
			if (this.phone && this.phone.length < 15) this.errors.phone = "Invalid phone number";

			const hasErrors = Object.values(this.errors).some((error) => error !== null);
			if (hasErrors) return this.goToStep(0);

			return true;
		},
	},
});
