import * as React from "react";
import { render } from "react-dom";
import { RangeContent, TableModel, VirTableScroll } from "virtabulized";

function tableExampleWithStaticStuck(): TableModel {
  return {
    colWidths: new Array(100).fill(80),
    rowHeights: new Array(100).fill(70),
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
              return new Array(100).fill(null).map((_, i) => ({
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "1px solid black",
                            backgroundColor: "#c19d9d",
                            width: "100%",
                            height: "100%"
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
              return new Array(100).fill(null).map((_, i) => ({
                type: "horizontal",
                key: `row/${i}`,
                stuck: i === 5 || i === 8,
                getChildren(): RangeContent[] {
                  return new Array(95).fill(null).map((__, j) => ({
                    type: "cell",
                    key: `cell/${i}/${j}`,
                    dimensions: { cols: 1, rows: 1 },
                    render(): React.ReactElement {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "1px solid black",
                            backgroundColor: "#acbd83",
                            width: "100%",
                            height: "100%"
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
          }
        ];
      }
    }
  };
}

const model: TableModel = tableExampleWithStaticStuck();

render(
  <div style={{ height: "100%", width: "100%" }}>
    <VirTableScroll
      model={model}
      style={{ height: "100%", width: "100%", border: "2px solid red", boxSizing: "border-box" }}
      options={{
        overscanFactor: 0
      }}
    />
  </div>,
  document.getElementById("root")
);
