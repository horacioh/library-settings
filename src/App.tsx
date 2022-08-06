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
    <div className="app" data-library-location={state.context.location}>
      <main className="main">
        <form>
          <label htmlFor="visibility">
            <input
              type="checkbox"
              id="visibility"
              checked={state.matches("open")}
              onChange={onChangeVisibility}
            />
            <span>Show Library</span>
          </label>
          <fieldset>
            <legend>Select Library Location:</legend>
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
          </fieldset>
        </form>
      </main>
      {state.matches("open") ? (
        <aside className="library">
          <span>I'm the library!</span>
        </aside>
      ) : null}
    </div>
  );
}
