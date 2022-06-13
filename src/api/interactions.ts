import { IWidget } from "../types/cores/widget";

export const interactionData = (): IWidget => ({
  header: "Average player interactions per min",
  graph: {
    yAxis: [
      {
        name: "Total",
        color: "black",
        data: [
          {
            value: 8,
            color: "#336EFF",
          },
          {
            value: 2.5,
            color: "#000000",
          },
          {
            value: 5,
            color: "#91AAE8",
          },
          {
            value: 1.9,
            color: "#D3D3D3",
          },
          {
            value: 3,
            color: "#486FD4",
          },
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 9,
            color: "#486FD4",
          },
          {
            value: 2,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#91AAE8",
          },
          {
            value: 6,
            color: "#486FD4",
          },
        ],
      },
      {
        name: "Positive feedback",
        color: "green",
        data: [
          {
            value: 6,
            color: "#6692FE",
          },
          {
            value: 2,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#91AAE8",
          },
          {
            value: 1.9,
            color: "#D3D3D3",
          },
          {
            value: 5,
            color: "#336EFF",
          },
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#486FD4",
          },
          {
            value: 5,
            color: "#91AAE8",
          },
          {
            value: 3,
            color: "#486FD4",
          },
        ],
      },
      {
        name: "Stimulation",
        color: "blue",
        data: [
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#6692FE",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 3,
            color: "#6692FE",
          },
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 3,
            color: "#486FD4",
          },
          {
            value: 3,
            color: "#91AAE8",
          },
          {
            value: 3,
            color: "#486FD4",
          },
        ],
      },
      {
        name: "Orientation",
        color: "yellow",
        data: [
          {
            value: 4,
            color: "#486FD4",
          },
          {
            value: 2,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 2,
            color: "#486FD4",
          },
          {
            value: 4,
            color: "#91AAE8",
          },
          {
            value: 3,
            color: "#91AAE8",
          },
          {
            value: 8,
            color: "#486FD4",
          },
          {
            value: 6,
            color: "#486FD4",
          },
          {
            value: 4,
            color: "#91AAE8",
          },
          {
            value: 3,
            color: "#486FD4",
          },
        ],
      },
      {
        name: "Negative feedback",
        color: "red",
        data: [
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#486FD4",
          },
          {
            value: 5,
            color: "#91AAE8",
          },
          {
            value: 3,
            color: "#486FD4",
          },
          {
            value: 1,
            color: "#91AAE8",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 5,
            color: "#486FD4",
          },
          {
            value: 8,
            color: "#91AAE8",
          },
          {
            value: 1,
            color: "#486FD4",
          },
        ],
      },
    ],
    xAxis: {
      name: "Profiles",
      data: [
        "Jon Fogh",
        "Jens Knudsen",
        "Peter Petersen",
        "Jakob Hjort",
        "Ahmed Mabrouk",
        "Jon Oogh",
        "Oens Onudsen",
        "Peter Oetersen",
        "Jakob Ojort",
        "Ahmed Oabrouk",
      ],
    },
  },
});
