export interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export interface FontAwesomeIconButton {
  class?: string;
  text?: string;
  icon: string;
}