import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TicketDetailsHeader from "./TicketDetailsHeader";

// Mock useToggle
const toggleMock = jest.fn();

jest.mock("../../hooks/useToggle", () => ({
  __esModule: true,
  default: () => ({
    isOpen: true,
    toggle: toggleMock,
  }),
}));

// Mock Button component if needed
jest.mock("../ui/button", () => ({
  Button: ({ children, onClick, className }: any) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("TicketDetailsHeader Component", () => {
  test("renders the main title", () => {
    render(<TicketDetailsHeader />);
    expect(
      screen.getByText("نواجه مشكلة في عدم عمل واجهة المستخدم")
    ).toBeInTheDocument();
  });

  test("renders all action buttons", () => {
    render(<TicketDetailsHeader />);

    expect(screen.getByText("تحويل لمهمة")).toBeInTheDocument();
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  test("toggle button calls toggle function", async () => {
    render(<TicketDetailsHeader />);

    const toggleBtn = screen.getByRole("button", { name: /circlechevron/i, hidden: true });

    // Click the button
    await userEvent.click(toggleBtn);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  test("shows left chevron icon when isOpen is true", () => {
    render(<TicketDetailsHeader />);

    expect(screen.getByRole("button", { name: /circlechevronleft/i, hidden: true })).toBeInTheDocument();
  });
});
