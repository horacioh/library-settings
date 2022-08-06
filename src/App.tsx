import { useActor, useInterpret } from "@xstate/react";
import { ChangeEvent, FormEvent, useState } from "react";
import "./app.css";
import { libraryMachine } from "./library-machine";

export function App() {
  const libraryService = useInterpret(libraryMachine);
  const [state] = useActor(libraryService);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    libraryService.send({ type: "CHANGE.LOCATION", value: event.target.value });
  }

  function onChangeVisibility() {
    libraryService.send({ type: "TOGGLE" });
  }

  return (
    <>
      <div className="app" data-library-location={state.context.location}>
        <main className="main">
          <h1>Main Content</h1>
        </main>
        {state.matches("open") ? (
          <aside className="library">
            <h3>library</h3>
          </aside>
        ) : null}
      </div>
      <div className="controls">
        <form>
          <label htmlFor="visibility">
            <input
              type="checkbox"
              id="visibility"
              checked={state.matches("open")}
              onChange={onChangeVisibility}
            />
            <span>Library is Visible</span>
          </label>
          <fieldset>
            <legend>Select Library Location:</legend>
            <div className="radio-elements">
              <label htmlFor="left">
                <input
                  type="radio"
                  id="left"
                  name="location"
                  value="left"
                  checked={state.context.location == "left"}
                  onChange={onInputChange}
                />
                <span>Left</span>
              </label>
              <label htmlFor="right">
                <input
                  type="radio"
                  id="right"
                  name="location"
                  value="right"
                  checked={state.context.location == "right"}
                  onChange={onInputChange}
                />
                <span>right</span>
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
