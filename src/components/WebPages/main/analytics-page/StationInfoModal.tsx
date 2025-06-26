"use client";

import {
  Modal,
  Descriptions,
  Row,
  Col,
  Card,
  Statistic,
  Typography,
} from "antd";

const { Title } = Typography;

interface StationInfoModalProps {
  visible: boolean;
  station: any;
  onClose: () => void;
}

export default function StationInfoModal({
  visible,
  station,
  onClose,
}: StationInfoModalProps) {
  const calculateStationTotal = (station: any) => {
    if (!station) return 0;
    return Object.entries(station)
      .filter(
        ([key]) =>
          !["key", "postCode", "name", "address", "sendingTime"].includes(key)
      )
      .reduce((sum, [, votes]) => sum + (votes as number), 0);
  };

  return (
    <Modal
      title="Polling Station Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {station && (
        <div>
          <Descriptions bordered column={2} style={{ marginBottom: "24px" }}>
            <Descriptions.Item label="Post Code">
              {station.postCode}
            </Descriptions.Item>
            <Descriptions.Item label="Station Name">
              {station.name}
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {station.address}
            </Descriptions.Item>
            <Descriptions.Item label="Sending Time" span={2}>
              {station.sendingTime}
            </Descriptions.Item>
          </Descriptions>

          <Title level={5}>Vote Breakdown</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            {Object.entries(station)
              .filter(
                ([key]) =>
                  ![
                    "key",
                    "postCode",
                    "name",
                    "address",
                    "sendingTime",
                  ].includes(key)
              )
              .map(([party, votes]) => (
                <Col xs={12} sm={8} md={6} key={party}>
                  <Card size="small">
                    <Statistic
                      title={party}
                      value={votes as number}
                      formatter={(value) => value.toLocaleString()}
                    />
                  </Card>
                </Col>
              ))}
          </Row>

          <Card>
            <Statistic
              title="Total Votes at Station"
              value={calculateStationTotal(station)}
              formatter={(value) => value.toLocaleString()}
              valueStyle={{ color: "#1677ff", fontSize: "24px" }}
            />
          </Card>
        </div>
      )}
    </Modal>
  );
}
