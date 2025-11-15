import { render, screen } from "@testing-library/react";
import QuickReplays from "./QuickReplays";

// Mock Badge and Button components
jest.mock("../ui/badge", () => ({
  __esModule: true,
  Badge: ({ children, className }: any) => (
    <div data-testid="badge" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("../ui/button", () => ({
  __esModule: true,
  Button: ({ children, className }: any) => (
    <button data-testid="button" className={className}>
      {children}
    </button>
  ),
}));

describe("QuickReplays Component", () => {
  const badges = [
    "مرحبا بك، سيتم تحويل المشكلة للفريق المختص",
    "أهلا، تم استلام طلبكم وجاري معالجته",
    "شكرا لتواصلكم معنا، سنعود إليكم قريبا",
    "تم تحديث طلبكم، يرجى التحقق من بريدكم الإلكتروني",
  ];

  test("renders the heading", () => {
    render(<QuickReplays />);
    expect(screen.getByText("ردود سريعة")).toBeInTheDocument();
  });

  test("renders all badges", () => {
    render(<QuickReplays />);
    const badgeElements = screen.getAllByTestId("badge");
    expect(badgeElements.length).toBe(badges.length);

    badges.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("renders the 'استدعاء من قالب' button with icon", () => {
    render(<QuickReplays />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("استدعاء من قالب")).toBeInTheDocument();
  });
});
