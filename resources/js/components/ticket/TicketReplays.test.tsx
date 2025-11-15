import { render, screen } from "@testing-library/react";
import TicketReplays from "./TicketReplays";

// Mock the ReplyItem component
jest.mock("../replays/ReplyItem", () => ({
  __esModule: true,
  default: ({ reply }: any) => <div data-testid="reply-item">{reply.text}</div>,
}));

// Mock the useUpdateReply hook
const mockReplays = [
  { id: 1, text: "رد رقم 1" },
  { id: 2, text: "رد رقم 2" },
  { id: 3, text: "رد رقم 3" },
];

jest.mock("../../hooks/useUpdateReply", () => ({
  __esModule: true,
  default: () => ({ replays: mockReplays }),
}));

describe("TicketReplays Component", () => {
  test("renders container with correct classes", () => {
    const { container } = render(<TicketReplays />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("flex-col");
    expect(wrapper).toHaveClass("gap-1");
    expect(wrapper).toHaveClass("mt-5");
    expect(wrapper).toHaveClass("h-[300px]");
    expect(wrapper).toHaveClass("overflow-y-scroll");
  });

  test("renders all replays using ReplyItem", () => {
    render(<TicketReplays />);
    const items = screen.getAllByTestId("reply-item");
    expect(items.length).toBe(mockReplays.length);

    mockReplays.forEach((replay) => {
      expect(screen.getByText(replay.text)).toBeInTheDocument();
    });
  });
});
