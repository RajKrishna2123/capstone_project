import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./styling.css";

/**
 * This renders an item in the table of contents list.
 * scrollIntoView is used to ensure that when a user clicks on an item, it will smoothly scroll.
 */
const Headings = ({ headings, activeId }) => (
  <ul className="mt-20 list-decimal pl-4 text-white text-lg">
    {headings.map((heading) => (
      <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
        <a
          className="TOC-bullet"
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="list-decimal pl-4 text-white text-lg">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={child.id === activeId ? "active" : ""}
              >
                <a
                  className="TOC-bullet"
                  href={`#${child.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${child.id}`).scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

/**
 * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
 */
const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = React.useState([]);

  React.useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("main h2, main h3")
    );

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = React.useRef({});
  React.useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      // Get all headings that are currently visible on the page
      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector("iframe"),
      rootMargin: "500px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

/**
 * Renders the table of contents.
 */
const TableOfContents = () => {
  const [activeId, setActiveId] = React.useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <nav className="overflow-x-hidden width-full m-x-16">
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  );
};

const DummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

function Documentation() {
  return (
    <div>
      <Navbar />
      <h1
        className="text-4xl font-extrabold text-center text-white mt-20"
        id="initial-header"
      >
        Documentation
      </h1>
      <div className="docs-container pt-10 backdrop-blur-lg">
        <main>
          <h2 className="first-h2" id="initial-header">
            About DATA
          </h2>
          <h3 className="doc-h3" id="sub-heading-1">
            Specification
          </h3>
          <ul className="ml-4 pl-4 list-disc">
            <li>1 million sample size </li>
            <li>Total size on disk 60GB</li>
            <li>Annotation provided in</li>
          </ul>
          <h3 className="doc-h3" id="sub-heading-2">
            Overlapping:
          </h3>
          <p className="para">
            The data that was provided had many issue the major one was the
            problem of overlapping after few observations the hierarchy of
            overlapping was found.
          </p>
          <p className="bg-black rounded-lg text-yellow-100 mx-4 pl-4">
            table" <br /> "table column header" <br />
            "table row" <br />
            "table projected row header"
            <br /> "table spanning
          </p>

          <p className="para">
            The above is level of variable that overlap each other in an order
            and to prevent them from overlapping pixel shift is introduced and
            explained in further processing also the mask generation procedure
            from XML to PNG
          </p>

          <h2 className="doc-h2" id="second-header">
            Annotation processing tools description
          </h2>
          <h3 className="doc-h3" id="sub-headera">
            Function: sub_set
          </h3>
          <p className="para">
            This function is responsible for creating a subset of annotations
            and images based on a specified count. It takes the paths to
            annotation files (anno_path), image files (path), and a count
            parameter (count) as inputs. It creates two directories,
            "subset/annotations" and "subset/images," and copies annotation and
            image files to these directories according to the count.
          </p>

          <h3 className="doc-h3" id="headera">
            Function: get_image_dimensions
          </h3>
          <p className="para">
            This function retrieves the dimensions (width, height, and channels)
            of an image given its file path (image_path). It reads the image
            using opencv and returns these dimensions as a tuple
          </p>
          <h3 className="doc-h3" id="headerb">
            Function: xml_to_png
          </h3>
          <p className="para">
            This function converts xml annotation files to png format. It takes
            as input the path to a directory containing xml files (xml_path),
            the output directory for png files (op_pngpath), the name of the
            feature to extract (feature_name), pixel shift values (pixel_shift),
            and the pixel value to assign to the feature (pixel_value). It
            processes each xml file, extracts the specified feature, and saves
            the result as a png file.
          </p>
          <h3 className="doc-h3" id="headerc">
            Function: png_to_png_feature_addition
          </h3>
          <p className="para">
            This function reads png annotation files, adds or modifies a
            specified feature, and saves the modified annotations as png files.
            It takes the following inputs: the path to the directory containing
            xml files (xml_path), the input directory containing png annotations
            (inp_png), the output directory for modified png annotations
            (op_png), the feature name to modify 3 (feature_name), pixel shift
            values (pixel_shift), and the pixel value to assign to the modified
            feature (pixel_value)
          </p>

          <h3 className="doc-h3" id="headerd">
            Function: intersection_ano_png
          </h3>
          <p className="para">
            This function performs an intersection operation on two sets of png
            annotation files (png_path1 and png_path2) and a reference png
            annotation set (refrence). It combines annotations where a specified
            pixel value (pixel_value) is present and saves the result as png
            files in the output directory (op_path).
          </p>
          <h3 className="doc-h3" id="headere">
            Function: intersection_ano_png2
          </h3>
          <p className="para">
            This function is similar to intersection_ano_png but performs the
            intersection operation on two sets of png annotation files
            (png_path1 and png_path2) and saves the result as png files in the
            output directory (op_path).
          </p>
          <h3 className="doc-h3" id="headerf">
            Function: padding
          </h3>
          <p className="para">
            This function adds padding to images and corresponding annotations
            to make them consistent in size. It takes the root directory of
            input images (root_img), output directory for images (output_img),
            root directory of input annotations (root_ano), and output directory
            for annotations (output_ano) as inputs. It resizes the images while
            preserving aspect ratio and adds padding to achieve a desired size.
            It also ensures that the annotations are properly aligned with the
            padded images.
          </p>

          <h3 className="doc-h3" id="headerg">
            Function: mask_conversion
          </h3>
          <p className="para">
            This function converts pixel values in png annotation files based on
            a provided dictionary (inp_dict). It takes the input directory of
            png annotation files (in_path), output directory for 4 modified png
            annotation files (op_path), and the dictionary to map pixel values
            (inp_dict) as inputs. It maps pixel values in the annotations
            according to the provided dictionary.
          </p>

          <h3 className="doc-h3" id="headerh">
            Function: test_train_val_split_80_10_10
          </h3>
          <p className="para">
            This function splits image and annotation data into training,
            validation, and testing sets. It takes the root directory of input
            images (img_root) and annotations (ano_root) as inputs. It randomly
            divides the data into training, validation, and testing sets,
            ensuring that the proportions are 80%, 10%, and 10%, respectively,
            and saves the files in corresponding directories.
          </p>
          <h2 className="doc-h2" id="third-header">
            Overall Code Purpose
          </h2>
          <p className="para">
            The provided code appears to be a collection of functions related to
            image and annotation processing tasks. Here's a summary of the
            code's overall purpose:
            <br />
            <br />
            <b>Subset creation (sub_set):</b> this function creates a subset of
            annotations and images based on a specified count.
            <br />
            <br />
            <b>Get image dimensions (get_image_dimensions):</b>this function
            retrieves the dimensions (width, height, and channels) of an image
            given its file path.
            <br />
            <br />
            <b>XML to PNG conversion (xml_to_png):</b> : converts xml annotation
            files to png format, extracting and modifying specific features.
            <b>
              Png to png feature addition (png_to_png_feature_addition):
            </b>{" "}
            reads png annotation files, adds or modifies specified features, and
            saves the modified annotations as png files.
            <br />
            <br />
            <b>Intersection of png annotations (intersection_ano_png):</b>
            performs an intersection operation on two sets of png annotation
            files and a reference set, combining annotations where a specified
            pixel value is present.
            <br />
            <br />
            <b>Padding images and annotations (padding):</b> adds padding to
            images and corresponding annotations to make them consistent in
            size.
            <br />
            <br />
            <b>Mask conversion (mask_conversion):</b> converts pixel values in
            png annotation files based on a provided dictionary.
            <br />
            <br />
            <b>Data splitting (test_train_val_split_80_10_10):</b> splits image
            and annotation data into training, validation, and testing sets,
            ensuring specified proportions.
            <br />
            <br />
            <b>Padding a single image (padding_img):</b> adds padding to a
            single image to make it consistent in size.
            <br />
            <br />
            This code provides a variety of image and annotation processing
            functionalities, which can be useful for tasks such as data
            preprocessing, dataset creation, and annotation manipulation in
            computer vision and machine learning projects.
          </p>
          <h2 className="doc-h2" id="fourth-header">
            Overview
          </h2>
          <p className="para">
            This code snippet is designed to organize a list of image file paths
            into batches. The purpose of dividing the image file paths into
            batches is to facilitate the processing of large datasets in
            smaller, more manageable portions. The code creates eight batches,
            each containing 100,000 image file paths, and a separate list for
            any remaining image file paths.
          </p>
          <h3 className="doc-h3" id="headeri">
            Code structure
          </h3>
          <ul className="list-decimal para">
            <li>
              <b>Input folder: </b>the input folder variable specifies the
              directory containing the image files to be processed.
            </li>
            <br />
            <li>
              <b>Image filenames:</b> the code generates a list of image
              filenames in the input folder by filtering filenames to include
              only those with a ".xml" file extension.
            </li>
            <br />
            <li>
              <b>Batches:</b> the image file paths are divided into eight
              batches, each containing 100,000 image file paths. The batches are
              named batch_1 through batch_8. The division is performed using
              list slicing, where each batch is a subset of the image file
              paths.
            </li>
            <br />
            <li>
              <b>Residual image paths:</b> the residual_xml_path variable holds
              any remaining image file paths that do not fit into the previous
              eight batches. These image file paths correspond to indices
              800,000 onwards in the image_filenames list.
            </li>
            <br />
          </ul>
          <h3 className="doc-h3" id="headerj">
            Purpose
          </h3>
          <p className="para">
            Organizing image file paths into batches allows for more efficient
            processing of large datasets. This batching approach is beneficial
            when dealing with datasets that may not fit entirely into memory or
            when processing tasks can be parallelized across multiple batches.
            By dividing the data, the code helps improve overall processing
            efficiency and resource management.
          </p>
          <h2 className="doc-h2" id="fifth-header">
            Batch overview
          </h2>
          <h3 className="doc-h3" id="headerk">
            1. Reading csv data
          </h3>
          <ul className="list-disc para">
            <li>Function: read_csv_to_array(filename)</li>
            <br />
            <li>
              Parameter: filename (string) - specifies the csv file name to be
              read.
            </li>
            <br />
            <li>
              Description: reads data from the csv file named batch_1.csv and
              stores it in an array called xml_paths.
            </li>
          </ul>
          <h3 className="doc-h3" id="headerl">
            2. Subset creation
          </h3>
          <ul className="list-disc para">
            <li>
              Function: <b>sub_set(anno_path, path, count)</b>
            </li>
            <br />
            <li>
              Parameters
              <br />
              <ul className="list-disc para">
                <li>
                  <b>Anno_path (string) -</b> path to the directory containing
                  xml annotation files.
                </li>
                <br />
                <li>
                  <b>Path (string) -</b> path to the directory containing image
                  files.
                </li>
                <br />
                <li>
                  <b>Count (integer) -</b> number of samples to include in the
                  subset (1,00,000 in this case).
                </li>
                <br />
              </ul>
            </li>
            <li>
              Description: creates a subset of annotations and images from the
              specified directories based on the provided count. The subset is
              saved in the subset/annotations and subset/images directories.
            </li>
          </ul>
          <h3 className="doc-h3" id="headerm">
            3. Xml to png conversion (stage 1)
          </h3>
          <ul className="list-disc para">
            <li>
              Function:{" "}
              <b>
                xml_to_png(xml_path, op_pngpath, feature_name, pixel_shift,
                pixel_value)
              </b>
            </li>
            <br />
            <li>
              Parameters
              <br />
              <ul className="list-disc para">
                <li>
                  <b>Xml_path (string) -</b> (string) - path to the directory
                  containing xml annotation files (stage 1 annotations).
                </li>
                <br />
                <li>
                  <b>Op_pngpath (string) -</b> - path to the directory where png
                  annotations will be saved (stage 1 png annotations).
                </li>
                <br />
                <li>
                  <b>Feature_name (string) -</b> name of the feature to extract
                  from xml annotations ("table row" in this case).
                </li>
                <br />
                <li>
                  <b>Pixel_shift (integer) - </b>pixel shift value applied to
                  the bounding boxes (3 in this case)
                </li>
                <br />
                <li>
                  <b>Pixel_value (integer) - </b>pixel value to be assigned to
                  the feature (255 in this case).
                </li>
              </ul>
            </li>
            <li>
              Description: converts xml annotation files in the specified
              directory into png format, extracting the "table row" feature with
              pixel modifications, and saves them in the subset/anno_stage1
              directory.
            </li>
          </ul>
          <h3 className="doc-h3" id="headern">
            4. Xml to png conversion (stage 2)
          </h3>
          <ul className="list-disc para">
            <li>
              Function:
              <b>
                xml_to_png(xml_path, op_pngpath, feature_name, pixel_shift,
                pixel_value)
              </b>
            </li>
            <br />
            <li>
              Parameters
              <br />
              <ul className="list-disc para">
                <li>
                  <b>Xml_path (string) -</b> path to the directory containing
                  xml annotation files (stage 2 annotations).
                </li>
                <br />
                <li>
                  <b>Op_pngpath (string) -</b> path to the directory where png
                  annotations will be saved (stage 2 png annotations).
                </li>
                <br />
                <li>
                  <b>Feature_name (string) -</b> name of the feature to extract
                  from xml annotations ("table column" in this case).
                </li>
                <br />
                <li>
                  <b>Pixel_shift (integer) - </b>pixel shift value applied to
                  the bounding boxes (3 in this case).
                </li>
                <br />
                <li>
                  <b>Pixel_value (integer) - </b>pixel value to be assigned to
                  the feature (255 in this case).
                </li>
              </ul>
            </li>
            <li>
              Description: converts xml annotation files in the specified
              directory into png format, extracting the "table column" feature
              with pixel modifications, and saves them in the subset/anno_stage2
              directory.
            </li>
          </ul>
          <h3 className="doc-h3" id="headero">
            5. Intersection of png annotations (stage 1 and stage 2)
          </h3>
          <ul className="list-disc para">
            <li>
              Function: :{" "}
              <b>
                intersection_ano_png2(png_path1, png_path2, op_path,
                pixel_value)
              </b>
            </li>
            <br />
            <li>Parameters</li>
            <ul className="list-disc para">
              <li>
                <b>Png_path1 (string) -</b> path to the directory containing
                stage 1 png annotations.
              </li>
              <br />
              <li>
                <b>Png_path2 (string) -</b> path to the directory containing
                stage 2 png annotations.
              </li>
              <br />
              <li>
                <b>Pixel_value (integer) -</b> pixel value to be present in both
                annotations for intersection (255 in this case).
              </li>
              <br />
              <li>
                <b>Op_path (string) -</b> path to the directory where the
                intersection results will be saved (stage 3 annotations).
              </li>
            </ul>
            <li>
              Description: performs an intersection operation on stage 1 and
              stage 2 png annotations and saves the result in the
              subset/anno_stage3 directory with a pixel value of 255.
            </li>
          </ul>
          <h3 className="doc-h3" id="headerp">
            6. Png feature addition (stage 3 to stage 7)
          </h3>
          <ul className="list-disc para">
            <li>
              Function:
              <b>
                png_to_png_feature_addition(xml_path, inp_png, op_png,
                feature_name, pixel_shift, pixel_value)
              </b>
            </li>
            <br />
            <li>Parameters (for each function)</li>
            <ul className="list-disc para">
              <li>
                <b>Xml_path (string) -</b> path to the directory containing xml
                annotation files (stage 3 to stage 7 annotations).
              </li>
              <br />
              <li>
                <b>Inp_png (string) -</b> path to the directory containing input
                png annotations (stage 3 to stage 7 input png annotations).
              </li>
              <br />
              <li>
                <b>Op_png (string) -</b> path to the directory where the
                modified png annotations will be saved.
              </li>
              <br />
              <li>
                <b>Feature_name (string) -</b> - name of the feature to add or
                modify.
              </li>
              <br />
              <li>
                <b>Pixel_shift (integer) -</b> pixel shift value applied to the
                bounding boxes.
              </li>
              <br />
              <li>
                <b>Pixel_value (integer) -</b> pixel value to be assigned to the
                modified or added feature.
              </li>
            </ul>
            <li>
              Description: these functions read xml annotation files and add or
              modify the specified feature, saving the modified annotations as
              png files in different stages (subset/anno_stage4 to
              subset/anno_stage7) with varying parameters.
            </li>
          </ul>
          <p className="para">
            The remaining functions continue with data processing, splitting,
            and padding, but the parameters and steps are like those described
            above. The provided explanations cover the initial stages of the
            code's execution.
          </p>
        </main>
        <TableOfContents />
      </div>
    </div>
  );
}

export default Documentation;
