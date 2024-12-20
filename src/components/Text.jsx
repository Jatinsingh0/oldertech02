// Import React and your translations
import React from "react";
import translations from "../translation.json";
import { connect } from "react-redux";

// Define your Text component
const Text = ({ language, name }) => {
  // Fetch the translated text based on the provided language and name props
  const text = translations.translations[language]?.[name] || "";

  // Render the translated text
  return <React.Fragment>{text}</React.Fragment>;
};

// Export your Text component
const mapStateToProps = (state) => ({
  language: state.general.language,
});

export default connect(mapStateToProps)(Text);
