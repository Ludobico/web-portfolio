import React from "react";
import create from "zustand";

const useZustand = create(() => ({
  top_scroll: "top_scroll",
  skill_scroll: "skill_scroll",
  project_scroll: "project_scroll",
  contact_scroll: "contact_scroll",
}));

export default useZustand;
