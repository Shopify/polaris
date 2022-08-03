import { Button, Card, Popover, ResourceList, Avatar } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function PopoverLazyLoadExample() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [visibleStaffIndex, setVisibleStaffIndex] = useState(5);
  const staff = [
    "Abbey Mayert",
    "Abbi Senger",
    "Abdul Goodwin",
    "Abdullah Borer",
    "Abe Nader",
    "Abigayle Smith",
    "Abner Torphy",
    "Abraham Towne",
    "Abraham Vik",
    "Ada Fisher",
    "Adah Pouros",
    "Adam Waelchi",
    "Adan Zemlak",
    "Addie Wehner",
    "Addison Wexler",
    "Alex Hernandez",
  ];

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleScrolledToBottom = useCallback(() => {
    const totalIndexes = staff.length;
    const interval =
      visibleStaffIndex + 3 < totalIndexes
        ? 3
        : totalIndexes - visibleStaffIndex;

    if (interval > 0) {
      setVisibleStaffIndex(visibleStaffIndex + interval);
    }
  }, [staff.length, visibleStaffIndex]);

  const handleResourceListItemClick = useCallback(() => {}, []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      View staff
    </Button>
  );

  const staffList = staff.slice(0, visibleStaffIndex).map((name) => ({
    name,
    initials: getInitials(name),
  }));

  return (
    <Card sectioned>
      <div style={{ height: "280px" }}>
        <Popover
          sectioned
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
        >
          <Popover.Pane onScrolledToBottom={handleScrolledToBottom}>
            <ResourceList items={staffList} renderItem={renderItem} />
          </Popover.Pane>
        </Popover>
      </div>
    </Card>
  );

  function renderItem({ name, initials }) {
    return (
      <ResourceList.Item
        id={name}
        media={<Avatar size="medium" name={name} initials={initials} />}
        onClick={handleResourceListItemClick}
      >
        {name}
      </ResourceList.Item>
    );
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map((surnameOrFamilyName) => {
        return surnameOrFamilyName.slice(0, 1);
      })
      .join("");
  }
}

export default withPolarisExample(PopoverLazyLoadExample);
