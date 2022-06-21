import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { OptionsLineComponent } from "../../sharedComponents/optionsLineComponent";
import type { IPropertyComponentProps } from "../../sharedComponents/nodeGraphSystem/interfaces/propertyComponentProps";
import type { LightBlock } from "core/Materials/Node/Blocks/Dual/lightBlock";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";

export class LightPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    render() {
        const scene = this.props.globalState.nodeMaterial!.getScene();
        const lightOptions = scene.lights.map((l) => {
            return { label: l.name, value: l.name };
        });

        lightOptions.splice(0, 0, { label: "All", value: "" });

        const lightBlock = this.props.data as LightBlock;

        return (
            <div>
                <GeneralPropertyTabComponent globalState={this.props.globalState} data={this.props.data} />
                <LineContainerComponent title="PROPERTIES">
                    <OptionsLineComponent
                        label="Light"
                        defaultIfNull={0}
                        noDirectUpdate={true}
                        valuesAreStrings={true}
                        options={lightOptions}
                        target={lightBlock}
                        propertyName="name"
                        onSelect={(name: any) => {
                            if (name === "") {
                                lightBlock.light = null;
                            } else {
                                lightBlock.light = scene.getLightByName(name);
                            }
                            this.forceUpdate();
                            this.props.globalState.onRebuildRequiredObservable.notifyObservers(true);
                        }}
                    />
                </LineContainerComponent>
            </div>
        );
    }
}
