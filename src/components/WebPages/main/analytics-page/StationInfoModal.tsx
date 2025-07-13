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
  // 🔥 Calculate total votes from station.polls
  const calculateStationTotal = (station: any) => {
    if (!station || !station.polls) return 0;
    return station.polls.reduce(
      (sum: number, poll: any) => sum + (poll.votes || 0),
      0
    );
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
              {station.agent?.postalCode}
            </Descriptions.Item>
            <Descriptions.Item label="Station Name">
              {station.station?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {station.station?.city}
            </Descriptions.Item>
            <Descriptions.Item label="Sending Time" span={2}>
              {new Date(station.createdAt).toLocaleTimeString()}
            </Descriptions.Item>
          </Descriptions>

          <Title level={5}>Vote Breakdown</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            {station.polls?.map((poll: any) => (
              <Col xs={12} sm={8} md={6} key={poll._id}>
                <Card size="small">
                  <Statistic
                    title={poll.name}
                    value={poll.votes}
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
