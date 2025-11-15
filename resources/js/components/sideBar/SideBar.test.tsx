import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

// Helper to get Arabic text safely
const getText = (text: string) => screen.getByText(text, { exact: false });

describe("SideBar Component", () => {
    test("renders all actions labels", () => {
        const labels = [
            "الإجراءات",
            "بيانات الاتصال",
            "تذاكر مرتبطة",
            "التفاصيل",
            "السجلات الزمنية",
        ];

        render(<SideBar />);

        labels.forEach((label) => {
            expect(getText(label)).toBeInTheDocument();
        });
    });

    test("highlights the active action (السجلات الزمنية)", () => {
        render(<SideBar />);

        const active = getText("السجلات الزمنية");

        // Parent div for the icon container
        const iconWrapper = active.closest("div")?.querySelector("div");

        expect(iconWrapper).toHaveClass("bg-[#00CA7C1A]");
        expect(iconWrapper).toHaveClass("rounded-xl");

        // Text color check
        expect(active).toHaveClass("text-[#29304C]");
    });

    test("renders exactly 5 actions", () => {
        render(<SideBar />);

        const items = screen.getAllByRole("img", { hidden: true });
        expect(items.length).toBe(5);
    });
});
