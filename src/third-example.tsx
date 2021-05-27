import { useEffect } from 'react';
import * as React from 'react';
import { render } from 'react-dom';
import { RangeContent, SearchDirection, SelectionControl, TableModel, VirTableScroll } from 'virtabulized';

interface ICellProps {
  selectionControl: SelectionControl,
  i: number,
  j: number
}

const TableCell: React.FC<ICellProps> = ({ selectionControl: { isSelected, selectTo, selectCell }, i, j }) => {
  const handleKeyDownDocument = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowDown':
        selectTo(SearchDirection.BOTTOM);
        break;
      case 'ArrowUp':
        selectTo(SearchDirection.TOP);
        break;
      case 'ArrowRight':
        selectTo(SearchDirection.RIGHT);
        break;
      case 'ArrowLeft':
        selectTo(SearchDirection.LEFT);
        break;
    }
  };

  useEffect(() => {
    if (isSelected) {
      document.addEventListener('keydown', handleKeyDownDocument)
    } else {
      document.removeEventListener('keydown', handleKeyDownDocument)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDownDocument)
    }
  }, [isSelected]);

  return (
    <div
      style={{
        outline: '1px solid black',
        backgroundColor: isSelected ? 'pink' : i % 5 === 0 && j % 5 === 0 ? 'gray' : '#fff',
        width: '100%',
        height: '100%',
        fontSize: '10px'
      }}
      onClick={(): void => {
        selectCell();
      }}
    >
      {`${i}/${j}`}
    </div>
  );
};

function tableExampleWithStaticStuck(): TableModel {
  const rows: number = 100;
  const cols: number = 100;

  return {
    colWidths: new Array(cols).fill(null).map(() => 30),
    rowHeights: new Array(rows).fill(null).map(() => 50),
    content: {
      type: 'horizontal',
      key: 'root',
      getChildren(): RangeContent[] {
        return [
          {
            type: 'vertical',
            key: 'left-column',
            stuck: true,
            getChildren(): RangeContent[] {
              return new Array(rows).fill(null).map((_, i) => ({
                type: 'horizontal',
                key: `left-column/row/${i}`,
                getChildren(): RangeContent[] {
                  return new Array(5).fill(null).map((__, j) => ({
                    type: 'cell',
                    key: `left-column/rows/${i}/${j}`,
                    dimensions: { cols: 1, rows: 1 },
                    render(): React.ReactElement {
                      return (
                        <div
                          style={{
                            outline: '1px solid black',
                            backgroundColor: '#fff',
                            width: '100%',
                            height: '100%',
                            fontSize: '10px'
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
            type: 'vertical',
            key: 'right-column',
            getChildren(): RangeContent[] {
              return new Array(rows).fill(null).map((_, i) => ({
                type: 'horizontal',
                key: `row/${i}`,
                stuck: i === 5 || i === 8,
                getChildren(): RangeContent[] {
                  return new Array(cols - 5).fill(null).map((__, j) => ({
                    type: 'cell',
                    key: `cell/${i}/${j}`,
                    dimensions: { cols: 1, rows: 1 },
                    selectable: i % 5 === 0 && j % 5 === 0,

                    render(selectionControl: SelectionControl): React.ReactElement {

                      return <TableCell selectionControl={selectionControl} i={i} j={j}/>;
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
  <div style={{ height: '100%', width: '100%' }}>
    <VirTableScroll
      model={model}
      options={{
        overscanFactor: 0.2
      }}
      style={{ height: '100%', width: '100%', boxSizing: 'border-box' }}
    />
  </div>,
  document.getElementById('root')
);
