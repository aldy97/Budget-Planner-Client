import { ReactWrapper } from "enzyme";

export const findTestWrapper = (
  wrapper: ReactWrapper,
  tag: string
): ReactWrapper => {
  return wrapper.find(`[data-test="${tag}"]`);
};
