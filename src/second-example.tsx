import * as React from "react";
import { render } from "react-dom";
import {
  Direction,
  RangeContent,
  ScrollPositions,
  ScrollSyncProvider,
  TableModel,
  VirTableScrollConsumer
} from "virtabulized";

interface ContainerState {
  providerPositions: ScrollPositions;
  tablePositions: ScrollPositions;
}

const StuckCell: React.FunctionComponent = (props): React.ReactElement => (
  <div
    style={{ outline: "1px solid black", backgroundColor: "yellow", width: "100%", height: "100%", fontSize: "10px" }}
  >
    {props.children}
  </div>
);

function tableExample(rows: number, cols: number, stuckRows: number[] = [], stuckCols: number[] = []): TableModel {
  return {
    colWidths: new Array(cols).fill(null).map(() => 30),
    rowHeights: new Array(rows).fill(null).map(() => 40),
    content: {
      type: "vertical",
      key: "root",
      getChildren(): RangeContent[] {
        return new Array(rows).fill(null).map((_, i) => ({
          key: `${i}`,
          type: "horizontal",
          stuck: stuckRows.includes(i),
          getChildren(): RangeContent[] {
            return new Array(cols).fill(null).map((__, j) => ({
              key: `${i}/${j}`,
              type: "cell",
              dimensions: { cols: 1, rows: 1 },
              stuck: stuckCols.includes(j),
              render(): React.ReactElement<void> {
                if (stuckRows.includes(i) || stuckCols.includes(j)) {
                  return <StuckCell>{i === 0 && j === 0 ? "Empty" : `${i}/${j}`}</StuckCell>;
                } else {
                  return (
                    <div
                      style={{
                        outline: "1px solid black",
                        backgroundColor:"#fff",
                        width: "100%",
                        height: "100%",
                        fontSize: "10px"
                      }}
                    >
                      {i === 0 && j === 0 ? "Empty" : `${i}/${j}`}
                    </div>
                  );
                }
              }
            }));
          }
        }));
      }
    }
  };
}


const firstModel: TableModel = tableExample(100, 100, [3, 5], [1, 4]);
const secondModel: TableModel = tableExample(100, 15, [3, 5], []);
const thirdModel: TableModel = tableExample(100, 100, [2, 4], [6, 7]);
const fourthModel: TableModel = tableExample(100, 15, [2, 4], []);

class Container extends React.PureComponent<{}, ContainerState> {
  state: ContainerState = { providerPositions: {}, tablePositions: {} };

  render(): React.ReactElement<{}> {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div>
          <div>Provider positions:</div>
          {Object.values(this.state.providerPositions).map((item, i) => (
            <div key={i}>
              Index {i}: x: {item.scrollLeft || 0} y: {item.scrollTop || 0}
            </div>
          ))}
          <div>Table positions:</div>
          {Object.values(this.state.tablePositions).map((item, i) => (
            <div key={i}>
              Table {i + 1}: x: {item.scrollLeft || 0} y: {item.scrollTop || 0}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ScrollSyncProvider
            direction={Direction.BOTH}
            onScrollCallback={(providerPositions): void => {
              this.setState((state) => ({ ...state, providerPositions }));
            }}
            startPositions={{ 0: { scrollLeft: 800, scrollTop: 0 } }}
            countOfIndexes={2}
          >
            <VirTableScrollConsumer
              model={firstModel}
              style={{ height: "40vh", width: "70vw", border: "2px solid red", boxSizing: "border-box" }}
              syncOption={{ direction: Direction.BOTH, indexes: { leftIndex: 0, topIndex: 0 } }}
              onScroll={(position): void => {
                this.setState((state) => ({ ...state, tablePositions: { ...state.tablePositions, [1]: position } }));
              }}
            />
            <VirTableScrollConsumer
              model={secondModel}
              style={{ height: "40vh", width: "30vw", border: "2px solid red", boxSizing: "border-box" }}
              syncOption={{ direction: Direction.VERTICAL, indexes: { leftIndex: 1, topIndex: 0 } }}
            />
            <VirTableScrollConsumer
              model={thirdModel}
              style={{ height: "40vh", width: "70vw", border: "2px solid red", boxSizing: "border-box" }}
              syncOption={{ direction: Direction.BOTH, indexes: { leftIndex: 0, topIndex: 1 } }}
            />
            <VirTableScrollConsumer
              model={fourthModel}
              style={{ height: "40vh", width: "30vw", border: "2px solid red", boxSizing: "border-box" }}
              syncOption={{ direction: Direction.VERTICAL, indexes: { leftIndex: 1, topIndex: 1 } }}
            />
          </ScrollSyncProvider>
        </div>
      </div>
    );
  }
}

render(<Container />, document.getElementById("root"));
