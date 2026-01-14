export interface InvitationDetails {
  bride: string;
  groom: string;
  date: string;
  location: string;
  rsvpDate?: string;
  rsvpContact?: string;
}

export interface AnimationProps {
  delay?: number;
  className?: string;
}