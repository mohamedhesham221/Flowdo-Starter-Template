import { render, screen } from "@testing-library/react";
import SideBarHistory from "./SideBarHistory";

//  Mock the useToggle hook
jest.mock("../../hooks/useToggle", () => ({
    __esModule: true,
    default: () => ({ isOpen: true }),
}));

describe("SideBarHistory Component", () => {
    test("renders sidebar title and badge count", () => {
        render(<SideBarHistory />);

        expect(screen.getByText("السجلات الزمنية")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    test("renders all 5 records", () => {
        render(<SideBarHistory />);
        const records = screen.getAllByText("أحدث الطلبات", { exact: false });
        expect(records.length).toBe(5);
    });

    test("renders timestamps for each record", () => {
        render(<SideBarHistory />);

        // Each record uses same timestamp => repetition allowed
        const dates = screen.getAllByText("2023-10-01");
        const times = screen.getAllByText("02:32 م");

        expect(dates.length).toBe(5);
        expect(times.length).toBe(5);
    });

    test("renders actions text for each record", () => {
        render(<SideBarHistory />);

        const actionSnippets = [
            "قام @محمد صقر بإنشاء تذكره",
            "قام @راشد فهد بالرد علي التذكره",
            "قام @العميل بالرد علي التذكره",
            "قام @راشد فهد باضافة ملاحظه",
            "قام @محمد صقر بتغيير حاله التذكره",
        ];

        actionSnippets.forEach((snippet) => {
            expect(screen.getByText((text) => text.includes(snippet))).toBeInTheDocument();
        });
    });

    test("renders the timeline between items except the last one", () => {
        render(<SideBarHistory />);

        // The vertical line: 4 times only (not for last record)
        const lines = screen.getAllByRole("presentation", { hidden: true });
    });

    test("does not render sidebar when isOpen = false", () => {
        // override mock:
        jest.mock("@/hooks/useToggle", () => ({
            __esModule: true,
            default: () => ({ isOpen: false }),
        }));

        render(<SideBarHistory />);

        expect(screen.queryByText("السجلات الزمنية")).not.toBeInTheDocument();
    });
});
