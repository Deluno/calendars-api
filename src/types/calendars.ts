export interface Calendar {
  id?: number;
  name: string;
  isPublic: boolean;
  ownerId?: number;
}

export interface SelectableCalendar extends Calendar {
  selected: boolean;
  saved: boolean;
}
