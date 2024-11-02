import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { ICardButtonsModel, IData, IDataDefinition } from "./CommonInterfaces";
import Link from "next/link";
import Button from "@/components/Button";
import axios from "axios";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const renderPagination = (
  data: IData | IData[],
  recordsPerPage: number,
  currentPage: number,
  onClick?: (value: number) => void
) => {
  const pages = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map((number) => (
    <Button
      key={number}
      onClick={() => onClick && onClick(number)}
      style={number === currentPage ? "primary" : "outline"}
    >
      {number}
    </Button>
  ));
};

export const calculateTotalPages = (
  data: IData[] | string[],
  pageSize: number
) => {
  return Math.ceil(data.length / pageSize);
};

export const renderCards = (
  data: IData[] | IData | string[],
  objectName: string,
  buttonsModel: ICardButtonsModel,
  dataUniqueIdentifier?: any,
  dataDefinition?: IDataDefinition
) => {
  return data.map((row: IData | string, index: number) => (
    <Card key={`${objectName}_card_${index}`}>
      <CardHeader key={`${objectName}_card_header_${index}`}>
        <p
          key={`${objectName}_title_over_${index}`}
          className="p-0 m-0 text-gray-400 text-xs"
        >
          {typeof row === "object" && dataDefinition?.titleOver
            ? row[dataDefinition.titleOver]
            : ""}
        </p>
        <CardTitle key={`${objectName}_card_title_${index}`}>
          {typeof row === "object" && dataDefinition?.title
            ? row[dataDefinition.title]
            : capitalizeFirstLetter(row as string)}
        </CardTitle>
        <hr key={`${objectName}_hr_${index}`} />
        <CardDescription key={`${objectName}_description_${index}`}>
          {typeof row === "object" && dataDefinition?.description
            ? row[dataDefinition.description]
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent key={`${objectName}_card_content_${index}`}>
        <div
          key={`${objectName}_card_content_container_${index}`}
          className="inline space-x-2"
        >
          {buttonsModel.view && (
            <Link
              href={`/${objectName}/${
                typeof row === "object" ? row[dataUniqueIdentifier] : row
              }`}
              key={`${objectName}_view_${index}`}
            >
              <Button style="positive">View</Button>
            </Link>
          )}
          {buttonsModel.edit && (
            <Link
              href={`/${objectName}/${
                typeof row === "object" ? row[dataUniqueIdentifier] : row
              }/Edit`}
              className="ml-2"
            >
              <Button style="outline">Edit</Button>
            </Link>
          )}
          {buttonsModel.delete && (
            <Button
              style="danger"
              onClick={async () => {
                const confirm = window.confirm(
                  "Are you sure you want to delete this item?"
                );
                console.log(confirm);
                if (confirm) {
                  const res = await deleteObject(
                    objectName,
                    typeof row === "object"
                      ? row[dataUniqueIdentifier]
                      : undefined
                  );
                  if (res?.status === 200) {
                    console.log("Deleted");
                    window.location.reload();
                  } else {
                    console.log("Error deleting item");
                    console.log(res);
                  }
                } else {
                  console.log("Cancelled");
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  ));
};

export const getDefaultValues = (data: IData) => {
  let _data: IData = {};

  for (const key in data) {
    switch (typeof data[key]) {
      case "string":
        _data[key] = "";
        break;
      case "number":
        _data[key] = 0;
        break;
      case "object":
        _data[key] = {};
        break;
      case "boolean":
        _data[key] = false;
        break;
      default:
        _data[key] = "";
        break;
    }
  }

  return _data;
};

export const deleteObject = async (objectName: string, id?: number) => {
  const objectToDelete = id ? `${objectName}/${id}` : objectName;
  try {
    const res = await axios(`http://localhost:2999/${objectToDelete}`, {
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
