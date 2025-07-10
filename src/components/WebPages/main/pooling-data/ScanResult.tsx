import React from "react";
import { Card, Row, Col, Button, Table, Typography } from "antd";
import { toast } from "sonner";
const { Title, Text } = Typography;

interface ScanResultProps {
  scanResultColumns: any[];
  allPollingStations: any[];
}

export default function ScanResult({
  scanResultColumns,
  allPollingStations,
}: ScanResultProps) {
  return (
    <Row>
      <Col span={24}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Title
              level={4}
              style={{ margin: 0, fontSize: 24, fontWeight: 500 }}
            >
              Scan Result
            </Title>
            <Button
              onClick={() => toast.info("Feature coming soon...")}
              type="primary"
              style={{ backgroundColor: "#18953D", borderColor: "#52c41a" }}
            >
              Publish
            </Button>
          </div>

          <Table
            columns={scanResultColumns}
            dataSource={allPollingStations.slice(0, 5)}
            // scroll={{ x: 700, y: 510 }}
            pagination={false}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
}
