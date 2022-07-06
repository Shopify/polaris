export const PUBLIC_GA_ID = "UA-49178120-32";

export const pageview = (url) => {
  window.gtag("config", PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
