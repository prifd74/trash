const errors = [
  {
    keywords: ['staff', 'staff application'],
  },
  {
    keywords: ['how to make ticket', 'ticket making'],
  },
  {
    keywords: ['missing permissions', 'no permissions'],
  },
  {
    keywords: ['partner', 'how to partner'],
  },
   {
       keywords: ['help','available ai support']
   },
    {
       keywords: ['support','contact support']
   }
];

// Define linkTriggers (ensure this variable is initialized)
const linkTriggers = [
  {
    keywords: ['click link', 'follow link'],
    url: 'https://example.com/', // Replace with actual URL
  },
  {
    keywords: ['go to url', 'visit page'],
    url: 'https://example.com/', // Replace with actual URL
  },
  // Add more trigger objects as needed
];

// Define command triggers (e.g., help and support)
const commandTriggers = [
  {
    keywords: ['help', 'help me', 'how to get help'],
    action: 'help', // You could link to a function or a help page
  },
  {
    keywords: ['support', 'need support', 'contact support'],
    action: 'support', // Link to a support function or page
  },
];

// Function to generate link trigger objects with links
const generateLinkTriggers = () => {
  return linkTriggers.flatMap((trigger) =>
    trigger.keywords.map((keyword) => ({
      keyword,
      link: trigger.url,
    }))
  );
};

// Function to generate command trigger objects for actions (like 'help' or 'support')
const generateCommandTriggers = () => {
  return commandTriggers.flatMap((trigger) =>
    trigger.keywords.map((keyword) => ({
      keyword,
      action: trigger.action,
    }))
  );
};

// Extract all keywords into a single array (errors + linkTriggers + commandTriggers)
const allKeywords = [
  ...errors.flatMap((error) => error.keywords),
  ...generateLinkTriggers().map((linkTrigger) => linkTrigger.keyword),
  ...generateCommandTriggers().map((commandTrigger) => commandTrigger.keyword),
];

module.exports = {
  allKeywords,
  generateLinkTriggers, // Export the function in case you want to use it elsewhere
  generateCommandTriggers, // Export the command generation function as well
};