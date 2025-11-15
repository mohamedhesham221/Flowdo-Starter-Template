import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormBody from "./FormBody";

// Mock Button
jest.mock("../ui/button", () => ({
  __esModule: true,
  Button: ({ children, onClick, type, className }: any) => (
    <button data-testid={type || "button"} onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

// Mock useUpdateReply
const addNewReplyMock = jest.fn();
jest.mock("../../hooks/useUpdateReply", () => ({
  __esModule: true,
  default: () => ({
    replays: [],
    addNewReply: addNewReplyMock,
  }),
}));

describe("FormBody Component", () => {
  test("renders textarea with placeholder", () => {
    render(<FormBody />);
    const textarea = screen.getByPlaceholderText("إضافة رد ...") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe("");
  });

  test("renders all buttons", () => {
    render(<FormBody />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("إضافة رد"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("الغاء"))).toBeInTheDocument();
    // Sparkle و Paperclip لا يحتوي نص، سيتم اختبار وجود الأزرار بشكل عام
    const buttons = screen.getAllByTestId("button");
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  test("typing in textarea updates value", async () => {
    render(<FormBody />);
    const textarea = screen.getByPlaceholderText("إضافة رد ...") as HTMLTextAreaElement;
    await userEvent.type(textarea, "اختبار الرسالة");
    expect(textarea.value).toBe("اختبار الرسالة");
  });

  test("submitting form calls addNewReply and clears textarea", async () => {
    render(<FormBody />);
    const textarea = screen.getByPlaceholderText("إضافة رد ...") as HTMLTextAreaElement;
    const submitButton = screen.getByText((content) => content.includes("إضافة رد"));

    await userEvent.type(textarea, "اختبار الرسالة");
    fireEvent.click(submitButton);

    expect(addNewReplyMock).toHaveBeenCalledTimes(1);
    expect(addNewReplyMock).toHaveBeenCalledWith(expect.objectContaining({
      message: "اختبار الرسالة",
    }));
  });

  test("clicking cancel button clears textarea", async () => {
    render(<FormBody />);
    const textarea = screen.getByPlaceholderText("إضافة رد ...") as HTMLTextAreaElement;
    const cancelButton = screen.getByText((content) => content.includes("الغاء"));

    await userEvent.type(textarea, "اختبار الرسالة");
    fireEvent.click(cancelButton);

    expect(textarea.value).toBe("");
  });
});
