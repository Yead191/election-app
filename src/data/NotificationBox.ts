export interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  statusColor: string;
}

export interface Message {
  key: string;
  sno: number;
  name: string;
  message: string;
  time: string;
  fullMessage?: string;
  title?: string;
  messageId?: string;
}

export const contacts: Contact[] = [
  {
    id: 1,
    name: "Mr. Nadir",
    status: "Tiki",
    avatar: "/assets/user1.jpg?height=40&width=40",
    statusColor: "#1890ff",
  },
  {
    id: 2,
    name: "Siphokazi Selebe",
    status: "Senda",
    avatar: "/assets/user2.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 3,
    name: "Alison Moloi",
    status: "Senda",
    avatar: "/assets/user4.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 4,
    name: "Mr. Nadir",
    status: "Tazada",
    avatar: "/assets/user5.svg?height=40&width=40",
    statusColor: "#faad14",
  },
  {
    id: 5,
    name: "Babalwa Moloi",
    status: "Senda",
    avatar: "/assets/user6.svg?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 6,
    name: "Rashied Naaido",
    status: "Tazada",
    avatar: "/assets/user7.svg?height=40&width=40",
    statusColor: "#faad14",
  },
  {
    id: 7,
    name: "Candice Ryan",
    status: "Senda",
    avatar: "/assets/user8.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 8,
    name: "Asadur Yead",
    status: "Senda",
    avatar: "/assets/yead_dp.jpg?height=40&width=40",
    statusColor: "#52c41a",
  },
];

export const messageData: Message[] = [
  {
    key: "100",
    sno: 100,
    name: "Mr. Nadir",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
    title: "Tiki",
    messageId: "2472",
    fullMessage:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet. Donec tincidunt efficitur. In In ipsum Cras turpis viverra Donec ullamcorper placerat dignissim diam sed leo. Nulla vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa eget vehicula.",
  },
  {
    key: "99",
    sno: 99,
    name: "Siphokazi Selebe",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "98",
    sno: 98,
    name: "Alison Moloi",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "97",
    sno: 97,
    name: "Mr. Nadir",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "96",
    sno: 96,
    name: "Babalwa Moloi",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
];
