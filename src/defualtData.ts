import { AppType } from "./schemas/note";

export const defaultData: AppType = {
  notes: [
    {
      heading: "Welcome",
      content: "Hey, let's start making this app",
      date_created: new Date(
        "Fri Oct 22 2021 16:53:08 GMT+0100 (British Summer Time)"
      ),
    },
  ],
};
