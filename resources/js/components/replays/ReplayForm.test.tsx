import { render, screen } from "@testing-library/react";
import ReplayForm from "./ReplayForm";

// Mock Badge
jest.mock("../ui/badge", () => ({
  __esModule: true,
  Badge: ({ children, className }: any) => (
    <div data-testid="badge" className={className}>{children}</div>
  ),
}));

// Mock Button
jest.mock("../ui/button", () => ({
  __esModule: true,
  Button: ({ children, className }: any) => (
    <button data-testid="button" className={className}>{children}</button>
  ),
}));

// Mock FormBody
jest.mock("./FormBody", () => ({
  __esModule: true,
  default: () => <div data-testid="form-body">FormBody</div>,
}));

describe("ReplayForm Component", () => {
  test("renders wrapper with correct classes", () => {
    const { container } = render(<ReplayForm />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("flex-col");
    expect(wrapper).toHaveClass("mt-5");
    expect(wrapper).toHaveClass("border");
    expect(wrapper).toHaveClass("rounded-md");
    expect(wrapper).toHaveClass("p-2");
    expect(wrapper).toHaveClass("gap-5");
  });

  test("renders heading labels", () => {
    render(<ReplayForm />);
    expect(screen.getByText("رد الي:")).toBeInTheDocument();
    expect(screen.getByText("cc:")).toBeInTheDocument();
  });

  test("renders badges and buttons", () => {
    render(<ReplayForm />);
    const badges = screen.getAllByTestId("badge");
    const buttons = screen.getAllByTestId("button");

    expect(badges.length).toBeGreaterThanOrEqual(4);

    expect(screen.getByText("cc")).toBeInTheDocument();

    expect(buttons.some(btn => btn.textContent === "")).toBeTruthy();
  });

  test("renders input field with placeholder", () => {
    render(<ReplayForm />);
    const input = screen.getByPlaceholderText("ادخل الاسم") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("email");
  });

  test("renders FormBody", () => {
    render(<ReplayForm />);
    expect(screen.getByTestId("form-body")).toBeInTheDocument();
  });
});
