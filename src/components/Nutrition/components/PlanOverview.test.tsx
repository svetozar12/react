import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TEST_NUTRITIONAL_PLAN_1, TEST_NUTRITIONAL_PLAN_2 } from "tests/nutritionTestdata";
import { PlansOverview } from "components/Nutrition/components/PlansOverview";
import { useFetchNutritionalPlansQuery } from "components/Nutrition/queries";

jest.mock("components/Nutrition/queries");

const queryClient = new QueryClient();

describe("Test the PlansOverview component", () => {

    beforeEach(() => {
        // @ts-ignore
        useFetchNutritionalPlansQuery.mockImplementation(() => ({
            isSuccess: true,
            isLoading: false,
            data: [TEST_NUTRITIONAL_PLAN_1, TEST_NUTRITIONAL_PLAN_2]
        }));

    });

    test('renders all plans correctly', async () => {

        // Act
        render(
            <QueryClientProvider client={queryClient}>
                <PlansOverview />
            </QueryClientProvider>
        );

        // Assert
        expect(useFetchNutritionalPlansQuery).toHaveBeenCalled();
        expect(screen.getByText('nutrition.plans')).toBeInTheDocument();
        expect(screen.getByText('Summer body!!!')).toBeInTheDocument();
        expect(screen.getByText('Bulking till we puke')).toBeInTheDocument();
    });
});
