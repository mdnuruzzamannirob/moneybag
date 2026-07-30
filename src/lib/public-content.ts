export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'build-a-budget-that-sticks',
    title: 'How to build a budget you will actually stick to',
    excerpt:
      'A practical, low-stress way to plan your spending without turning every purchase into a guilt trip.',
    category: 'Budgeting',
    date: 'July 24, 2026',
    readTime: '6 min read',
    color: 'from-indigo-500 to-violet-500',
    sections: [
      {
        paragraphs: [
          'The best budget is not the most detailed one. It is the one you can keep using when life gets busy. Start with a simple picture of what comes in, what must go out, and what you want your money to make possible.',
          'Instead of treating a budget as a restriction, think of it as a plan made before the noise of the month begins.',
        ],
      },
      {
        heading: 'Start with the shape of your month',
        paragraphs: [
          'List your reliable income, fixed commitments, and a realistic average for flexible spending. Leave room for irregular costs so a repair or annual renewal does not feel like a surprise.',
          'Use broad categories at first. You can always add detail later when that detail helps you make a decision.',
        ],
      },
      {
        heading: 'Review, do not restart',
        paragraphs: [
          'A category going over its target is information—not failure. Move money deliberately, note what changed, and carry the lesson into next month. A short weekly check-in is usually enough.',
        ],
      },
    ],
  },
  {
    slug: 'shared-finances-without-stress',
    title: 'Shared finances without the awkward spreadsheet',
    excerpt: 'A calmer system for splitting expenses, keeping context, and knowing who owes what.',
    category: 'Family finance',
    date: 'July 18, 2026',
    readTime: '5 min read',
    color: 'from-fuchsia-500 to-pink-500',
    sections: [
      {
        paragraphs: [
          'Shared money gets stressful when the system depends on memory. A clear record of who paid, what it was for, and how it should be split removes most of the friction.',
          'The goal is not to track one another. It is to create a shared source of truth that nobody has to reconstruct later.',
        ],
      },
      {
        heading: 'Agree on the rules first',
        paragraphs: [
          'Decide which expenses are shared, how you will split them, and how often you will settle. Equal splits are simple, while percentage or exact splits can be fairer when circumstances differ.',
        ],
      },
      {
        heading: 'Keep the history useful',
        paragraphs: [
          'Add short notes to unusual purchases and settle on a predictable rhythm. When everyone can see the same balance and context, money conversations become shorter and kinder.',
        ],
      },
    ],
  },
  {
    slug: 'emergency-fund-first-milestone',
    title: 'Your emergency fund: choosing the first milestone',
    excerpt:
      'Why a smaller, specific first target can be more useful than chasing an intimidating number.',
    category: 'Saving',
    date: 'July 10, 2026',
    readTime: '4 min read',
    color: 'from-emerald-500 to-teal-500',
    sections: [
      {
        paragraphs: [
          'Three to six months of expenses is a helpful long-term benchmark, but it can feel impossibly far away. Your first milestone should solve the most likely expensive surprise in your life.',
        ],
      },
      {
        heading: 'Choose a useful first number',
        paragraphs: [
          'Look at your recent unexpected costs: a medical bill, a device replacement, or urgent travel. Pick an amount that would have kept the next similar event off a credit card.',
          'Automate a contribution on payday and treat progress as a percentage, not a pass-or-fail result.',
        ],
      },
      {
        heading: 'Protect the purpose',
        paragraphs: [
          'Keep the fund accessible but separate from everyday spending. If you use it, celebrate that it did its job and rebuild without guilt.',
        ],
      },
    ],
  },
  {
    slug: 'monthly-money-review',
    title: 'The 20-minute monthly money review',
    excerpt: 'Four questions that turn transaction history into better choices for next month.',
    category: 'Money habits',
    date: 'July 2, 2026',
    readTime: '4 min read',
    color: 'from-amber-400 to-orange-500',
    sections: [
      {
        paragraphs: [
          'A useful money review should be short enough to repeat. Set aside twenty minutes, remove distractions, and look for decisions—not a perfect explanation of every transaction.',
        ],
      },
      {
        heading: 'Ask four simple questions',
        paragraphs: [
          'What went better than expected? What surprised us? Which recurring cost no longer earns its place? What is one change that would make next month easier?',
          'Write down that one change and make it concrete: adjust a budget, cancel a subscription, or schedule a savings transfer.',
        ],
      },
    ],
  },
];
