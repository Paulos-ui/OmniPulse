export type Outcome  = 'YES' | 'NO' | 'UNRESOLVED';
export type Category = 'crypto' | 'sports' | 'politics' | 'tech' | 'other';

export interface Market {
  id:          string;
  question:    string;
  creator:     string;
  createdAt:   number;
  endTime:     number;
  resolved:    boolean;
  outcome:     Outcome;
  yesPrice:    number;   // 0–1
  noPrice:     number;
  volume:      number;
  liquidity:   number;
  category:    Category;
  traders:     number;
}
