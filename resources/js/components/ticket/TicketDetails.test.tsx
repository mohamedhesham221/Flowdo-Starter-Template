import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TicketDetails from "./TicketDetails";

// Mock the child components
jest.mock("./TicketDetailsHeader", () => () => <div>TicketDetailsHeader</div>);
jest.mock("./TicketReplays", () => () => <div>TicketReplays</div>);
jest.mock("../replays/QuickReplays", () => () => <div>QuickReplays</div>);
jest.mock("../replays/ReplayForm", () => () => <div>ReplayForm</div>);

describe("TicketDetails Component", () => {
  test("renders wrapper div with correct classes", () => {
    const { container } = render(<TicketDetails />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("w-3/5");
    expect(wrapper).toHaveClass("p-4");
    expect(wrapper).toHaveClass("flex-grow");
  });

  test("renders all child components", () => {
    render(<TicketDetails />);

    expect(screen.getByText("TicketDetailsHeader")).toBeInTheDocument();
    expect(screen.getByText("TicketReplays")).toBeInTheDocument();
    expect(screen.getByText("QuickReplays")).toBeInTheDocument();
    expect(screen.getByText("ReplayForm")).toBeInTheDocument();
  });
});
