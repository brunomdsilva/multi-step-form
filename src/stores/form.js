import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFormStore = defineStore("form", () => {
	state: () => ({
		form: {
			name: "",
			email: "",
			phone: "",
		},
	});
});
