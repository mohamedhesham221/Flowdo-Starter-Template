import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReplyItem from "./ReplyItem";

// Mock Button
jest.mock("../ui/button", () => ({
  __esModule: true,
  Button: ({ children, onClick, className }: any) => (
    <button data-testid="button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

// Mock useUpdateReply hook
const toggleExpandMock = jest.fn();

jest.mock("../../hooks/useUpdateReply", () => ({
  __esModule: true,
  default: () => ({ toggleExpand: toggleExpandMock }),
}));

describe("ReplyItem Component", () => {
  const reply = {
    id: 1,
    name: "محمد صقر",
    message: "هذا هو نص الرسالة",
    image: "profile.jpg",
    timestamp: { date: "2023-11-15", time: "12:00 م" },
    replyTo: "راشد فهد",
    emails: ["test1@example.com", "test2@example.com"],
    expand: true,
  };

  test("renders name, timestamp, replyTo and emails", () => {
    render(<ReplyItem reply={reply} />);

    expect(screen.getByText(reply.name)).toBeInTheDocument();
    expect(screen.getByText(reply.timestamp.date)).toBeInTheDocument();
    expect(screen.getByText(reply.timestamp.time)).toBeInTheDocument();
    expect(screen.getByText(`موجهة إلي ${reply.replyTo}`)).toBeInTheDocument();

    // Check emails
    reply.emails.forEach((email) => {
      expect(screen.getByText((text) => text.includes(email))).toBeInTheDocument();
    });
  });

  test("renders profile image", () => {
    render(<ReplyItem reply={reply} />);
    const img = screen.getByAltText(`${reply.name} profile`) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(reply.image);
  });

  test("renders message if expand is true", () => {
    render(<ReplyItem reply={reply} />);
    expect(screen.getByText(reply.message)).toBeInTheDocument();
  });

  test("calls toggleExpand when chevron button is clicked", async () => {
    render(<ReplyItem reply={reply} />);
    const button = screen.getAllByTestId("button")[0]; // أول زر هو chevron
    await userEvent.click(button);
    expect(toggleExpandMock).toHaveBeenCalledWith(reply.id);
  });

  test("shows ChevronUp icon when expand is true", () => {
    render(<ReplyItem reply={reply} />);
    expect(screen.getByRole("button", { hidden: true })).toBeInTheDocument();
  });
});
