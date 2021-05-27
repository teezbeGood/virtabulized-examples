import * as React from "react";
import { render } from "react-dom";
import { RangeContent, SelectionControl, StartRangePosition, TableModel, VirTableScroll } from "virtabulized";

function tableExampleWithStaticStuck(cols: number, rows: number): TableModel {
  return {
    colWidths: new Array(cols).fill(null).map(() => 30),
    rowHeights: new Array(rows).fill(null).map(() => 50),
    content: {
      type: "horizontal",
      key: "root",
      getChildren(): RangeContent[] {
        return [
          {
            type: "vertical",
            key: "left-column",
            stuck: true,
            getChildren(): RangeContent[] {
              return new Array(rows).fill(null).map((_, i) => ({
                type: "horizontal",
                key: `row/${i}`,
                getChildren(): RangeContent[] {
                  return new Array(5).fill(null).map((__, j) => ({
                    type: "cell",
                    key: `cell/${i}/${j}`,
                    dimensions: { cols: 1, rows: 1 },
                    render(): React.ReactElement {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid black",
                            borderRight: "1px solid black",
                            padding: "3px 0",
                            backgroundColor: "#fff",
                            width: "100%",
                            height: "100%",
                            fontSize: "10px",
                            boxSizing: "border-box"
                          }}
                        >
                          {`${i}/${j}`}
                        </div>
                      );
                    }
                  }));
                }
              }));
            }
          },
          {
            type: "vertical",
            key: "right-column",
            getChildren(): RangeContent[] {
              return new Array(rows).fill(null).map((_, i) => ({
                type: "horizontal",
                key: `row/${i}`,
                stuck: i === 0 || i === 1,
                getChildren(): RangeContent[] {
                  return new Array(cols - 5).fill(null).map((__, j) => ({
                    type: "cell",
                    key: `cell/${i}/${j}`,
                    dimensions: { cols: 1, rows: 1 },
                    selectable: i % 5 === 0 && j % 5 === 0,
                    render({ isSelected, selectCell }: SelectionControl): React.ReactElement {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid black",
                            borderRight: "1px solid black",
                            padding: "3px 0",
                            backgroundColor: isSelected ? "pink" : i % 5 === 0 && j % 5 === 0 ? "gray" : "#fff",
                            width: "100%",
                            height: "100%",
                            fontSize: "10px",
                            boxSizing: "border-box"
                          }}
                          onClick={(): void => {
                            selectCell();
                          }}
                        >
                          {`${i}/${j + 5}`}
                        </div>
                      );
                    }
                  }));
                }
              }));
            }
          }
        ];
      }
    }
  };
}

interface TableState {
  col: number;
  row: number;
  startRangePosition: StartRangePosition;
}

class Table extends React.PureComponent<{}, TableState> {
  state: TableState = {
    col: 70,
    row: 50,
    startRangePosition: {
      col: 10,
      row: 10
    }
  };

  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (event): void => {
    event.preventDefault();
    event.persist();
    this.setState((state) => ({
      ...state,
      col: Number(event.target[0].value),
      row: Number(event.target[1].value)
    }));
  };

  render(): JSX.Element {
    const { col, row, startRangePosition } = this.state;
    const model: TableModel = tableExampleWithStaticStuck(col, row);

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div style={{ height: "3%", width: "100%" }}>
          <form onSubmit={this.handleSubmit}>
            <input
              style={{ margin: "4px 5px 4px 10px", width: "80px" }}
              type="number"
              min={0}
              max={1000}
              placeholder="col range"
            />
            <input
              style={{ margin: "4px 10px 4px 5px", width: "80px" }}
              type="number"
              min={0}
              max={1000}
              placeholder="row range"
            />
            <button type="submit">Change table dimensions</button>
          </form>
        </div>
        <div style={{ height: "97%", width: "100%" }}>
          <VirTableScroll
            model={model}
            startRangePosition={startRangePosition}
            options={{
              overscanFactor: 0.2
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    );
  }
}

render(<Table />, document.getElementById("root"));
