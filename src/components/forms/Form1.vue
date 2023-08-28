<template>
	<div class="flex flex-col gap-4">
		<SmartInput type="text" label="Name" placeholder="e.g. Stephen King" />
		<SmartInput type="email" label="Email Address" placeholder="e.g.stephenking@lorem.com" />
		<SmartInput type="tel" label="Phone Number" placeholder="e.g. +1 234 567 890" />
	</div>
</template>

<script setup>
import SmartInput from "@/components/SmartInput.vue";
</script>
