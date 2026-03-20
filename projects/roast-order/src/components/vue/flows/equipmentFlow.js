
import { commonSteps } from './commonFlow';

export const equipmentFlow = {
    'Equipment': [
        {
            key: "catalog",
            component: "ShopCatalog",
            label: "Equipment",

            getProps: (ctx) => ({
                categories: ctx.categories,
                selectedCategory: ctx.selectedCategory
            }),

            getEvents: ({pendingProduct, nextStep}) => ({
                add: (product) => {

                    pendingProduct.value = product;
                    nextStep();
                    // ctx.confirmSelection();

                }
            })
        },

        ...commonSteps
    ]
};