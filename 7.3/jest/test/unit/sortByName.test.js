const sorting = require("../../app");
describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
describe ("Test when there is no sorting", () => {
  test("Must not sort two identical books", () =>{
    expect(
      sorting.sortByName([
        "Весенний лес",
        "Весенний лес",
      ])
    ).toEqual([
      "Весенний лес",
      "Весенний лес",
    ]);
  });
});