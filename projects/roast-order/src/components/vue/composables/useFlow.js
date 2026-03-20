import { ref, computed } from 'vue';

export function useFlow({ flowConfig, componentMap, context }) {
    const selectedCategory = ref(null);
    const stepIndex = ref(0);

    const currentFlow = computed(() => {
        if (!selectedCategory.value) return [];
        return flowConfig[selectedCategory.value] || [];
    });

    const currentStep = computed(() => currentFlow.value[stepIndex.value]);

    // 🔥 PIPELINE HOOKS
    const runBeforeEnter = async (step) => {
        if (step?.beforeEnter) {
            await step.beforeEnter(context);
        }
    };

    const runAfterLeave = async (step) => {
        if (step?.afterLeave) {
            await step.afterLeave(context);
        }
    };

    // 🚀 NAVIGATION
    const nextStep = async () => {
        const step = currentStep.value;
        await runAfterLeave(step);

        if (stepIndex.value < currentFlow.value.length - 1) {
            stepIndex.value++;
            await runBeforeEnter(currentStep.value);
        }
    };

    const prevStep = async () => {
        const step = currentStep.value;
        await runAfterLeave(step);

        if (stepIndex.value > 0) {
            stepIndex.value--;
            await runBeforeEnter(currentStep.value);
        }
    };

    const goToStep = async (key) => {
        const fromStep = currentStep.value;
        const idx = currentFlow.value.findIndex(s => s.key === key);

        if (idx === -1) return;

        await runAfterLeave(fromStep);

        stepIndex.value = idx;

        await runBeforeEnter(currentFlow.value[idx]);
    };

    const setCategory = async (category) => {
        selectedCategory.value = category;
        stepIndex.value = 0;
        await runBeforeEnter(currentFlow.value[0]);
    };

    // 🧩 STEP PROGRESS
    const steps = computed(() =>
        currentFlow.value.map((s, i) => ({
            id: i,
            label: s.label || s.key
        }))
    );

    // 🎯 COMPONENT
    const currentComponent = computed(() => {
        const step = currentStep.value;
        if (!step) {
            console.warn("Flow: Current step is undefined");
            return null;
        }
        const comp = componentMap[step.component];
        if (!comp) {
            console.error(`Flow: Component "${step.component}" not found in componentMap`);
            return null;
        }
        return comp;
    });

    // 📦 PROPS
    const getStepProps = () => {
        const step = currentStep.value;
        if (!step || !step.getProps) return {};

        const rawProps = step.getProps(context);

        const plainProps = {};
        Object.keys(rawProps).forEach(key => {
            const val = rawProps[key];
            plainProps[key] = (val && typeof val === 'object' && '__v_isRef' in val)
                ? val.value
                : val;
        });

        return plainProps;
    };

    // ⚡ EVENTS
    const getStepEvents = () => {
        return currentStep.value?.getEvents?.({
            ...context,
            nextStep,
            prevStep,
            goToStep
        }) || {};
    };

    return {
        selectedCategory,
        stepIndex,
        currentStep,
        currentFlow,

        steps,
        currentComponent,

        nextStep,
        prevStep,
        goToStep,
        setCategory,

        getStepProps,
        getStepEvents
    };
}