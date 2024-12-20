import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../actions";
import { useSelector } from "react-redux";
import "./components.css";
import Text from "./Text";

const LanguageSwitch = ({ color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState(
    useSelector((state) => state.general.language)
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className="language-popup-titles"
        onClick={() => setIsVisible(!isVisible)}
        style={{ color: color }}
      >
        <div className="menu-content-title">
          <Text name="choose_language" />
        </div>
        <div className="menu-content-info">
          English, Spanish, French, Portuguese and Dutch
        </div>
      </div>

      {isVisible && (
        <div className="language-popup">
          <div className="language-popup-title" style={{ color: color }}>
            Current Language ({lang})
          </div>

          <div className="pop-up">
            <div
              className="op"
              onClick={() => {
                dispatch(setLanguage("en"));
                setIsVisible(!isVisible);
                setLang("en");
              }}
            >
              English {lang === "en" ? "(current)" : "(en)"}{" "}
            </div>
            <div
              className="op"
              onClick={() => {
                dispatch(setLanguage("es"));
                setIsVisible(!isVisible);
                setLang("es");
              }}
            >
              Spanish {lang === "es" ? "(current)" : "(es)"}{" "}
            </div>
            <div
              className="op"
              onClick={() => {
                dispatch(setLanguage("pt"));
                setIsVisible(!isVisible);
                setLang("pt");
              }}
            >
              Portuguese {lang === "pt" ? "(current)" : "(pt)"}{" "}
            </div>
            <div
              className="op"
              onClick={() => {
                dispatch(setLanguage("fr"));
                setIsVisible(!isVisible);
                setLang("fr");
              }}
            >
              French {lang === "fr" ? "(current)" : "(fr)"}{" "}
            </div>
            <div
              className="op"
              onClick={() => {
                dispatch(setLanguage("nl"));
                setIsVisible(!isVisible);
                setLang("nl");
              }}
            >
              Dutch {lang === "nl" ? "(current)" : "(nl)"}{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
